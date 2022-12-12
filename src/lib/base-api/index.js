const baseUrl = location.hostname
let baseApi
switch (baseUrl) {
  case 'dev-shouyin-shop.nle-tech.com':
    baseApi = {
      BASE_API_URL: 'https://dev-shouyin-api.nle-tech.com',
      IMAGE_URL: 'https://dev-nl-mes-api.nle-tech.com',
      EUSHOP_ADDRESS: 'http://dev-wxshop.nle-tech.com',
      SHOP_ADMIN: 'https://dev-adminshop.nle-tech.com'
    }
    break
  // case 'adminshop.myeushop.com':
  //   baseApi = {
  //     // 正式服
  //     BASE_API_URL: 'https://nl-mes-admin-api.eutechne.com/admin',
  //     // BASE_API_URL: `https://www.myeushop.com/admin`, // PC端
  //     IMAGE_URL: 'https://nl-mes-api.eutechne.com',
  //     EUSHOP_ADDRESS: 'http://wx.myeushop.cn',
  //     SHOP_ADMIN: 'http://adminshop.myeushop.com'
  //   }
  //   break
  // // 比利时商城
  case '46.244.121.14':
    baseApi = {
      BASE_API_URL: 'http://46.244.121.14:6101',
      IMAGE_URL: 'https://test-myeushop.eutechne.com',
      EUSHOP_ADDRESS: 'http://test-wxshop.eutechne.cn',
      SHOP_ADMIN: 'https://test-myeushop.eutechne.com'
    }
    break
  case '46.244.121.14:6101':
    baseApi = {
      BASE_API_URL: 'http://46.244.121.14:6101',
      IMAGE_URL: 'https://test-myeushop.eutechne.com',
      EUSHOP_ADDRESS: 'http://test-wxshop.eutechne.cn',
      SHOP_ADMIN: 'https://test-myeushop.eutechne.com'
    }
    break
  // 测试服
  // default:
  //   baseApi = {
  //     BASE_API_URL: 'https://test-myeushop.eutechne.com/admin',
  //     IMAGE_URL: 'https://test-myeushop.eutechne.com',
  //     EUSHOP_ADDRESS: 'http://test-wxshop.eutechne.cn',
  //     SHOP_ADMIN: 'https://test-myeushop.eutechne.com'
  //   }
  //   break
  default:
    baseApi = {
      // BASE_API_URL: 'https://dev-nl-mes-api.nle-tech.com/admin',
      BASE_API_URL: 'https://dev-shouyin-api.nle-tech.com',
      IMAGE_URL: 'https://dev-nl-mes-api.nle-tech.com',
      EUSHOP_ADDRESS: 'http://dev-wxshop.nle-tech.com',
      SHOP_ADMIN: 'https://dev-adminshop.nle-tech.com'
    }
    break
}
export default baseApi
