import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packagesDir = path.join(__dirname, "apps"); // 하위 프로젝트 위치 가져오기
const dependenciesMap = new Map();

fs.readdirSync(packagesDir).forEach((packageName) => {
  const packageJsonPath = path.join(packagesDir, packageName, "package.json");
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
    const dependencies = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    };

    Object.keys(dependencies).forEach((dep) => {
      if (!dependenciesMap.has(dep)) {
        dependenciesMap.set(dep, new Set());
      }
      dependenciesMap.get(dep).add(packageName);
    });
  }
});

// 공통 의존성 추출
const commonDependencies = [...dependenciesMap.entries()]
  .filter(([_, packages]) => packages.size > 1) // 여러 패키지에서 사용되는 경우만 필터링
  .map(([dep]) => dep);

console.log("공통 의존성 목록:", commonDependencies);
