export class UtilsService {

  // String printers and normalizers
  printDate( date: Date ): string {
    let d = new Date(date)

    const month = d.getMonth() + 1 < 10 ? `0${ d.getMonth() + 1 }` : d.getMonth() + 1
    const day = d.getDate() < 10 ? `0${ d.getDate() }` : d.getDate()
    const hour = d.getHours() < 10 ? `0${ d.getHours() }` : d.getHours()
    const min = d.getMinutes() < 10 ? `0${ d.getMinutes() }` : d.getMinutes()
    return `${ day }.${ month }.${ d.getFullYear() } - ${ hour }:${ min }`
  }

  printDay( date: Date ): string {
    let d = new Date(date)

    const month = d.getMonth() + 1 < 10 ? `0${ d.getMonth() + 1 }` : d.getMonth() + 1
    const day = d.getDate() < 10 ? `0${ d.getDate() }` : d.getDate()
    return `${ day }.${ month }.${ d.getFullYear() }`
  }

  static printNumber( num: number ): string {
    if (typeof (num) !== "number") return "0"
    return num.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1 ")
  }

  static printCurrency( num: number ): string {
    return `${ this.printNumber(num) } Руб`
  }

  printSqlDate( date: Date ): string {
    return new Date(date).toISOString()
  }

  printPeriod( from: Date, to: Date ): string {
    return `(${ this.normalizeDateString(this.printDay(from)) } - ${ this.normalizeDateString(this.printDay(to)) })`
  }

  normalizeDateString( str: string ): string {
    return str.replace(/:/g, ".")
  }

  parseJSON( str: string ): any | null {
    let parsed
    try {
      parsed = JSON.parse(str)
    } catch (err) {
      parsed = null
    }

    return parsed
  }

  parseDate( str: string, separator: string ): Date {
    const splitted: string[] = str.split(separator)
    return new Date(+splitted[2], +splitted[1], +splitted[0])
  }

  printPhoneNumber( number: number | string ): string {
    const num = number.toString()
    return `+${num.slice(0, 3)} (${ num.slice(3, 5) }) ${ num.slice(5, 8) }-${ num.slice(8, 10) }-${ num.slice(10, 12) }`
  }

  // Number
  round( number: number, decimal: number = 2 ): number {
    return Number(Math.round(+(number.toString() + "e" + decimal.toString())) + "e-" + decimal)
  }

  // Date
  startOfMonth(): Date {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth())
  }
}
