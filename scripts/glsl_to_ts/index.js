const fs = require("fs");

const targetDirPath = __dirname + "/../../glsl";
const outputDirPath = __dirname + "/../../src/glsl";
const extention = /\.frag$/i;
const dir = fs.readdirSync(targetDirPath);

dir.forEach((fileName) => {
  if (!fileName.match(extention)) {
    return;
  }

  const content = fs.readFileSync(targetDirPath + "/" + fileName);
  const newContent = `const shader = \`
${content.toString().replace(/\s+$/, "")}
\`;

export default shader;
`;

  fs.writeFileSync(
    outputDirPath + "/" + fileName.replace(extention, ".ts"),
    newContent
  );
});
