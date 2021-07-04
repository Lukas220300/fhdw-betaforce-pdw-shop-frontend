;(() => {
  try {
    // @ts-ignore
    const ctx = require.context(
      '.',
      true,
      /^\.\/(?!0-settings|1-tools).+\.scss$/
    )
    ctx.keys().forEach(ctx)
  } catch (e) {
    console.error(e)
  }
})()
