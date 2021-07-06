const files  = require.context('.', true, /\.ts$/)
const modules: any = {}

files.keys().forEach((key) => {
  if (key === './index.ts') return;
  if (key.includes('index.ts')) {
    modules[key.replace(/(\.\/|\/index\.ts)/g, '')] = files(key).default;
  }
});

export default modules;
