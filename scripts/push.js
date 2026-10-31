import { spawnSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdtempSync,
  readdirSync,
  rmSync,
} from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pagesRepository = "git@github.com:hooleeas/hooleeas.github.io.git";
const pagesBranch = "main";

const run = (command, args, cwd = root) => {
  const result = spawnSync(command, args, { cwd, stdio: "inherit" });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(" ")} 执行失败。`);
  }
};

const hasStagedChanges = (cwd) => {
  const result = spawnSync("git", ["diff", "--cached", "--quiet"], {
    cwd,
    stdio: "ignore",
  });
  if (result.error) throw result.error;
  if (result.status === 1) return true;
  if (result.status !== 0) throw new Error("无法检查 Git 暂存区。");
  return false;
};

const commitAndPush = (cwd, branch, message) => {
  run("git", ["add", "-A"], cwd);
  if (hasStagedChanges(cwd)) {
    run("git", ["commit", "-m", message], cwd);
  } else {
    console.log("没有文件变更，跳过提交。");
  }
  run("git", ["push", "origin", branch], cwd);
};

const pushSource = (message) => {
  const branchResult = spawnSync("git", ["branch", "--show-current"], {
    cwd: root,
    encoding: "utf8",
  });
  if (branchResult.error) throw branchResult.error;
  if (branchResult.status !== 0 || !branchResult.stdout.trim()) {
    throw new Error("无法确定当前分支，请先切换到一个 Git 分支。");
  }
  const branch = branchResult.stdout.trim();
  const remoteResult = spawnSync("git", ["remote", "get-url", "origin"], {
    cwd: root,
    stdio: "ignore",
  });
  if (remoteResult.error) throw remoteResult.error;
  if (remoteResult.status !== 0) {
    throw new Error("找不到 origin 远程仓库，请先配置 GitHub 仓库地址。");
  }
  commitAndPush(root, branch, message);
};

const pushPages = (message) => {
  pushBuiltPages(message);
};

const pushBuiltPages = (message) => {
  const distDirectory = path.join(root, "dist");
  const indexPath = path.join(distDirectory, "index.html");
  if (!existsSync(indexPath)) {
    throw new Error("构建完成后找不到 dist/index.html，已停止推送。");
  }

  const temporaryDirectory = mkdtempSync(
    path.join(os.tmpdir(), "astro-blog-pages-"),
  );
  const siteDirectory = path.join(temporaryDirectory, "site");
  try {
    run(
      "git",
      ["clone", "--branch", pagesBranch, "--single-branch", pagesRepository, siteDirectory],
    );
    for (const entry of readdirSync(siteDirectory)) {
      if (entry !== ".git") {
        rmSync(path.join(siteDirectory, entry), { recursive: true, force: true });
      }
    }
    cpSync(distDirectory, siteDirectory, { recursive: true });
    commitAndPush(siteDirectory, pagesBranch, message);
  } finally {
    rmSync(temporaryDirectory, { recursive: true, force: true });
  }
};

try {
  const [mode, ...messageParts] = process.argv.slice(2);
  const messages = {
    repo: "Update blog repository",
    pages: "Update GitHub Pages site",
  };
  if (!Object.hasOwn(messages, mode)) {
    throw new Error(
      "用法：npm run push-repo\n" +
        "      npm run push-pages",
    );
  }
  const message = messageParts.join(" ").trim() || messages[mode];
  if (mode === "repo") {
    pushSource(message);
  } else pushPages(message);
} catch (error) {
  console.error(`推送失败：${error.message}`);
  process.exitCode = 1;
}
