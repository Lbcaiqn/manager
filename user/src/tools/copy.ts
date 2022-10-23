function deepCopy(source: any): any{
  let res: any = Array.isArray(source) ? [] : {}
  for(let i in source){
    if(typeof source[i] == 'object')  res[i] = deepCopy(source[i])
    else  res[i] = source[i]
  }
  return res
}

export {
    deepCopy
}