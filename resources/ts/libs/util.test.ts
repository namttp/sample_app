import { isSmartPhone, isEnablesYCM } from './util'

describe('isSmartPhoneのテスト', () => {
  // falseを期待するPCのUA候補
  const falseCandidatesPC = [
    // Windows Chrome
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100',
    // Mac Chrome
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
    // Mac Firefox
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:68.0) Gecko/20100101 Firefox/68.0',
    // Windows Firefox
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:92.0) Gecko/20100101 Firefox/92.0',
    // IE
    'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko',
    // Edge
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36 Edg/94.0.992.31',
    // Mac Safari
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Safari/605.1.15',
  ]
  falseCandidatesPC.forEach((ua) => {
    test('「' + ua + '」はfalseを返すこと', () => {
      // @ts-ignore
      window.navigator.__defineGetter__('userAgent', () => ua)
      expect(isSmartPhone()).toBe(false)
    })
  })

  // trueを期待するタブレットのUA候補
  const trueCandidatesTablet = [
    // iPad Safari 13.0
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0 Safari/605.1.15',
    // iPad Safari 14.0
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Safari/605.1.15',
    // iPad Mini Safari 12.4.1
    'Mozilla/5.0 (iPad; CPU OS 12_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1.2 Mobile/15E148 Safari/604.1',
    // iPad Pro 12.4.1
    'Mozilla/5.0 (iPad; CPU OS 12_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1.2 Mobile/15E148 Safari/604.1',
    // GALAXY Tab S SCT21 ブラウザ
    'Mozilla/5.0 (Linux; Android 4.4.4; ja-jp; SCT21 Build/KTU84P) AppleWebKit/537.36 (KHTML, like Gecko) Version/1.5 Chrome/28.0.1500.94 Safari/537.36',
  ]

  trueCandidatesTablet.forEach((ua) => {
    test('「' + ua + '」はtrueを返すこと', () => {
      // @ts-ignore
      window.navigator.__defineGetter__('userAgent', () => ua)
      // この部分は実機のみでしかチェックできないので、ontouchendがある前提
      document.ontouchend = () => {}
      expect(isSmartPhone()).toBe(true)
    })
  })

  // trueを期待するiPhoneのUA候補
  const trueCandidatesiPhone = [
    // iOS 12.0
    'Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1',
    // iOS 13.0
    'Mozilla/5.0 (iPhone; CPU iPhone OS 13_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0 Mobile/15E148 Safari/604.1',
    // iOS 14.0
    'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
    // iOS 14.4
    'Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1',
    // iOS 14.5
    'Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1 Mobile/15E148 Safari/604.1',
    // iOS 15.0
    'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
    // iOS 16.0
    'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
  ]

  trueCandidatesiPhone.forEach((ua) => {
    test('「' + ua + '」はtrueを返すこと', () => {
      // @ts-ignore
      window.navigator.__defineGetter__('userAgent', () => ua)
      // この部分は実機のみでしかチェックできないので、ontouchendがある前提
      document.ontouchend = () => {}
      expect(isSmartPhone()).toBe(true)
    })
  })

  // trueを期待するAndroidのUA候補
  const trueCandidatesAndroid = [
    // GALAXY S5
    'Mozilla/5.0 (Linux; Android 6.0.1; ja-jp; SCL23 Build/MMB29M) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/46.0.2490.76 Mobile Safari/537.36',
    // GALAXY S6
    'Mozilla/5.0 (Linux; Android 7.0; ja-jp; SM-G920S Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/46.0.2490.76 Mobile Safari/537.36',
    // GALAXY S7
    'Mozilla/5.0 (Linux; Android 8.0.0; ja-jp; SM-G930S Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/46.0.2490.76 Mobile Safari/537.36',
    // GALAXY S8
    'Mozilla/5.0 (Linux; Android 9; ja-jp; SM-G950S Build/PPR1.180610.011) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/46.0.2490.76 Mobile Safari/537.36',
    // GALAXY S9
    'Mozilla/5.0 (Linux; Android 10; ja-jp; SM-G960S Build/QP1A.190711.020) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/46.0.2490.76 Mobile Safari/537.36',
    // GALAXY S10
    'Mozilla/5.0 (Linux; Android 11; ja-jp; SM-G973S Build/RP1A.200720.012) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/46.0.2490.76 Mobile Safari/537.36',
    // GALAXY S20
    'Mozilla/5.0 (Linux; Android 11; ja-jp; SM-G981S Build/RP1A.200720.012) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/46.0.2490.76 Mobile Safari/537.36',
    // GALAXY S21
    'Mozilla/5.0 (Linux; Android 11; ja-jp; SM-G991S Build/RP1A.200720.012) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/46.0.2490.76 Mobile Safari/537.36',
    // GALAXY Note
    'Mozilla/5.0 (Linux; Android 10; ja-jp; SM-N975S Build/QP1A.190711.020) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/46.0.2490.76 Mobile Safari/537.36',
    // Google Pixel 3
    'Mozilla/5.0 (Linux; Android 10; ja-jp; Pixel 3 Build/QP1A.190711.020) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/46.0.2490.76 Mobile Safari/537.36',
    // Google Pixel 4
    'Mozilla/5.0 (Linux; Android 11; ja-jp; Pixel 4 Build/RP1A.200720.012) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/46.0.2490.76 Mobile Safari/537.36',
    // Google Pixel 5
    'Mozilla/5.0 (Linux; Android 11; ja-jp; Pixel 5 Build/RP1A.200720.012) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/46.0.2490.76 Mobile Safari/537.36',
    // Google Pixel 6
    'Mozilla/5.0 (Linux; Android 12; ja-jp; Pixel 6 Build/SR1A.211205.002) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/46.0.2490.76 Mobile Safari/537.36',
  ]

  trueCandidatesAndroid.forEach((ua) => {
    test('「' + ua + '」はtrueを返すこと', () => {
      // @ts-ignore
      window.navigator.__defineGetter__('userAgent', () => ua)
      // この部分は実機のみでしかチェックできないので、ontouchendがある前提
      document.ontouchend = () => {}
      expect(isSmartPhone()).toBe(true)
    })
  })
})

describe('isEnablesYCMのテスト', () => {
  // 1.有効なiPhone
  // trueを期待するiPhoneのUA候補
  const trueCandidatesiPhone = [
    // iOS 14.3
    'Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
    // iOS 14.4
    'Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1',
    // iOS 14.5
    'Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1 Mobile/15E148 Safari/604.1',
    // iOS 14.6
    'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.2 Mobile/15E148 Safari/604.1',
    // iOS 14.7
    'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.3 Mobile/15E148 Safari/604.1',
    // iOS 14.8
    'Mozilla/5.0 (iPhone; CPU iPhone OS 14_8 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.4 Mobile/15E148 Safari/604.1',
    // iOS 14.9
    'Mozilla/5.0 (iPhone; CPU iPhone OS 14_9 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.5 Mobile/15E148 Safari/604.1',
    // iOS 15.0
    'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
    // iOS 15.1
    'Mozilla/5.0 (iPhone; CPU iPhone OS 15_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
    // iOS 15.2
    'Mozilla/5.0 (iPhone; CPU iPhone OS 15_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
    // iOS 15.3
    'Mozilla/5.0 (iPhone; CPU iPhone OS 15_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
    // iOS 15.4
    'Mozilla/5.0 (iPhone; CPU iPhone OS 15_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
    // iOS 15.5
    'Mozilla/5.0 (iPhone; CPU iPhone OS 15_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
    // iOS 15.6
    'Mozilla/5.0 (iPhone; CPU iPhone OS 15_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
    // iOS 15.7
    'Mozilla/5.0 (iPhone; CPU iPhone OS 15_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
    // iOS 15.8
    'Mozilla/5.0 (iPhone; CPU iPhone OS 15_8 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
    // iOS 15.9
    'Mozilla/5.0 (iPhone; CPU iPhone OS 15_9 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
    // iOS 16.0
    'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
  ]

  trueCandidatesiPhone.forEach((ua) => {
    test('「' + ua + '」はtrueを返すこと', () => {
      // @ts-ignore
      window.navigator.__defineGetter__('userAgent', () => ua)
      expect(isEnablesYCM()).toBe(true)
    })
  })

  // 2. 無効なiPhone
  // falseを期待するiPhoneのUA候補
  const falseCandidatesiPhone = [
    // iOS 8.0
    'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12A365 Safari/600.1.4',
    // iOS 9.0
    'Mozilla/5.0 (iPhone; CPU iPhone OS 9_0 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13A344 Safari/601.1',
    // iOS 10.0
    'Mozilla/5.0 (iPhone; CPU iPhone OS 10_0 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/14A345 Safari/602.1',
    // iOS 11.0
    'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
    // iOS 12.0
    'Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1',
    // iOS 13.0
    'Mozilla/5.0 (iPhone; CPU iPhone OS 13_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0 Mobile/15E148 Safari/604.1',
    // iOS 14.0
    'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
    // iOS 14.1
    'Mozilla/5.0 (iPhone; CPU iPhone OS 14_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1 Mobile/15E148 Safari/604.1',
    // iOS 14.2
    'Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1',
  ]

  falseCandidatesiPhone.forEach((ua) => {
    test('「' + ua + '」はfalseを返すこと', () => {
      // @ts-ignore
      window.navigator.__defineGetter__('userAgent', () => ua)
      expect(isEnablesYCM()).toBe(false)
    })
  })

  // // 3. 有効なAndroid
  // trueを期待するAndroidのUA候補
  const trueCandidatesAndroid = [
    // GALAXY S10 Chrome
    'Mozilla/5.0 (Linux; Android 9.0; ja-jp; SM-G973S Build/QP1A.190711.020) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.2490.76 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; Android 10; ja-jp; SM-G973S Build/QP1A.190711.020) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.2490.76 Mobile Safari/537.36',
    // GALAXY S20 Chrome
    'Mozilla/5.0 (Linux; Android 10; ja-jp; SM-G980S Build/QP1A.190711.020) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.2490.76 Mobile Safari/537.36',
    // GALAXY S21 Chrome
    'Mozilla/5.0 (Linux; Android 11; ja-jp; SM-G991S Build/RP1A.200720.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.2490.76 Mobile Safari/537.36',
    // GALAXY S21 Chrome
    'Mozilla/5.0 (Linux; Android 11; ja-jp; SM-G998S Build/RP1A.200720.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.2490.76 Mobile Safari/537.36',
    // Google Chrome
    'Mozilla/5.0 (Linux; Android 10; ja-jp; Pixel 4 Build/QP1A.190711.020) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95 Mobile Safari/537.36',
    // Google Chrome
    'Mozilla/5.0 (Linux; Android 11; ja-jp; Pixel 5 Build/RP1A.200720.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.5 Mobile Safari/537.36',
    // Google Pixel 6
    'Mozilla/5.0 (Linux; Android 12; ja-jp; Pixel 6 Build/RP1A.200720.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.1 Mobile Safari/537.36',
    // Xperia 1 SOV40
    'Mozilla/5.0 (Linux; Android 10; ja-jp; SOV40 Build/52.1.A.3.100) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.2490.76 Mobile Safari/537.36',
    // Xperia 5
    '	Mozilla/5.0 (Linux; Android 10; SO-52A) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.2490.76 Mobile Safari/537.36',
  ]

  trueCandidatesAndroid.forEach((ua) => {
    test('「' + ua + '」はtrueを返すこと', () => {
      // @ts-ignore
      window.navigator.__defineGetter__('userAgent', () => ua)
      expect(isEnablesYCM()).toBe(true)
    })
  })

  // // 4. 無効なAndroid
  const falseCandidatesAndroid = [
    // 1. ブラウザがChrome以外
    // GALAXY S10 safari
    'Mozilla/5.0 (Linux; Android 9.0; ja-jp; SM-G973S Build/QP1A.190711.020) AppleWebKit/537.36 (KHTML, like Gecko) Mobile Safari/537.36',
    // GALAXY S20 safari
    'Mozilla/5.0 (Linux; Android 10; ja-jp; SM-G980S Build/QP1A.190711.020) AppleWebKit/537.36 (KHTML, like Gecko) Mobile Safari/537.36',
    // GALAXY S21 safari
    'Mozilla/5.0 (Linux; Android 11; ja-jp; SM-G991S Build/RP1A.200720.012) AppleWebKit/537.36 (KHTML, like Gecko) Mobile Safari/537.36',
    // GALAXY S21 Ultra safari
    'Mozilla/5.0 (Linux; Android 11; ja-jp; SM-G998S Build/RP1A.200720.012) AppleWebKit/537.36 (KHTML, like Gecko) Mobile Safari/537.36',
    // Google Pixel 4 safari
    'Mozilla/5.0 (Linux; Android 10; ja-jp; Pixel 4 Build/QP1A.190711.020) AppleWebKit/537.36 (KHTML, like Gecko) Mobile Safari/537.36',
    // Google Pixel 5 safari
    'Mozilla/5.0 (Linux; Android 11; ja-jp; Pixel 5 Build/RP1A.200720.012) AppleWebKit/537.36 (KHTML, like Gecko) Mobile Safari/537.36',
    // Google Pixel 6 safari
    'Mozilla/5.0 (Linux; Android 12; ja-jp; Pixel 6 Build/RP1A.200720.012) AppleWebKit/537.36 (KHTML, like Gecko) Mobile Safari/537.36',
    // 2.Chromeのバージョンが古い
    // GALAXY S10 Chrome
    'Mozilla/5.0 (Linux; Android 9.0; ja-jp; SM-G973S Build/QP1A.190711.020) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.2490.76 Mobile Safari/537.36',
    // GALAXY S20 Chrome
    'Mozilla/5.0 (Linux; Android 10; ja-jp; SM-G980S Build/QP1A.190711.020) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.2490.76 Mobile Safari/537.36',
    // GALAXY S21 Chrome
    'Mozilla/5.0 (Linux; Android 11; ja-jp; SM-G991S Build/RP1A.200720.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.2490.76 Mobile Safari/537.36',
    // GALAXY S21 Chrome
    'Mozilla/5.0 (Linux; Android 11; ja-jp; SM-G998S Build/RP1A.200720.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.2490.76 Mobile Safari/537.36',
    //3.Androidのバージョンが古い
    //HUAWEI Nexus 6P 8.1
    'Mozilla/5.0 (Linux; Android 8.1.0; Nexus 6P Build/OPM1.171019.011) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.2490.76 Mobile Safari/537.36',
    // LGQ Stylus801LG 8.1
    'Mozilla/5.0 (Linux; Android 8.1.0; LGQ Stylus801LG Build/OPM1.171019.011) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.2490.76 Mobile Safari/537.36',
    // Google Pixel 3 8.0
    'Mozilla/5.0 (Linux; Android 8; ja-jp; Pixel 3 Build/QP1A.190711.020) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98 Mobile Safari/537.36',
    // Xperia Z4 SOV31 6.0
    'Mozilla/5.0 (Linux; Android 6.0.1; ja-jp; SOV31 Build/32.4.A.1.54) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.2490.76 Mobile Safari/537.36',
    // Xperia Z5 SOV32 6.0.1
    'Mozilla/5.0 (Linux; Android 6.0.1; ja-jp; SOV32 Build/52.1.A.3.100) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.2490.76 Mobile Safari/537.36',
    // Xperia X Performance SOV33  6.0.1
    'Mozilla/5.0 (Linux; Android 6.0.1; SOV33 Build/39.0.C.0.282) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.81 Mobile Safari/537.36',
    // Xperia XZ SOV34  6.0.1
    'Mozilla/5.0 (Linux; Android 6.0.1; SOV34 Build/39.0.C.0.282) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.81 Mobile Safari/537.36',
  ]

  falseCandidatesAndroid.forEach((ua) => {
    test('「' + ua + '」はfalseを返すこと', () => {
      // @ts-ignore
      window.navigator.__defineGetter__('userAgent', () => ua)
      expect(isEnablesYCM()).toBe(false)
    })
  })
})
