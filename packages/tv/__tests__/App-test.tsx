/**
 * @format
 */

describe('TV App Package', () => {
  it('has correct package structure', () => {
    const packageJson = require('../package.json');
    expect(packageJson.name).toBe('@my-app/tv');
    expect(packageJson.dependencies['@my-app/app']).toBeDefined();
  });

  it('index.js exists and is valid', () => {
    const fs = require('fs');
    const path = require('path');
    const indexPath = path.join(__dirname, '..', 'index.js');
    expect(fs.existsSync(indexPath)).toBe(true);

    const indexContent = fs.readFileSync(indexPath, 'utf-8');
    expect(indexContent).toContain('@my-app/app');
    expect(indexContent).toContain('AppRegistry');
  });
});
