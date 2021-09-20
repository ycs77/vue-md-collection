import fg from 'fast-glob'

function getIgnore(exclude: string[]) {
  return ['node_modules', '.git', '**/__*__/**', ...exclude]
}

export async function getCollectionFiles(path: string): Promise<string[]> {
  const files = await fg('*.md', {
    ignore: getIgnore([]),
    onlyFiles: true,
    cwd: path,
  })

  return files
}
