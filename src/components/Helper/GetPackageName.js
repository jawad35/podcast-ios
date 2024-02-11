export const GetPackageName = (price) => {
    let name = ''
    if (price === 1900) {
      name = 'Basic'
    }
    if (price === 5900) {
      name = 'Top10'
    }
    if (price === 9900) {
      name = 'Pro'
    }
    return name
  }