const INSTANCE = Symbol('XProxy instance')

export class XProxy<T> {
  // @ts-ignore
  proxy: T
  constructor(public data: T, private parent?: XProxy<any>, public onUpdate?: (data: T) => void) {
    if (typeof data !== 'object') {
      throw 'use-seemless-immu-state only work with nested data like array/object'
    }
    if (Array.isArray(data)) {
      this.data = data.map(x => (typeof x === 'object')
        ? new XProxy(x, this).proxy
        : x
      ) as any
    } else {
      this.data = {} as T
      for (let k in data) {
        let x = data[k]
        this.data[k] = (typeof x === 'object')
          ? new XProxy(x, this).proxy
          : x
      }
    }
    this.updateProxy()
  }

  update() {
    if (Array.isArray(this.data)) {
      this.data = this.data.concat() as any
    } else {
      this.data = {
        ...this.data
      }
    }
    this.updateProxy()
    if (this.onUpdate) {
      this.onUpdate(this.proxy)
    }
    this.parent?.update()
  }

  updateProxy() {
    const that = this
    // @ts-ignore
    this.proxy = new Proxy(this.data, {
      get(target, prop) {
        if (prop === INSTANCE) return that
        // @ts-ignore
        return target[prop]
      },
      set(target, prop, value) {
        let instance = value[INSTANCE] as XProxy<any>
        if (instance) {
          instance.parent = that
          //@ts-ignore
          target[prop] = value
        } else {
          let p = (typeof value === 'object')
            ? new XProxy(value, that).proxy
            : value
          //@ts-ignore
          target[prop] = p
        }

        that.update()
        return true
      }
    })
  }

}