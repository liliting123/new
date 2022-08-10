const baseUrl = location.hostname
let baseApi
switch (baseUrl) {
  case 'dev-adminshouyin.nle-tech.com':
    baseApi = {
      BASE_API_URL: 'https://dev-shouyin-api.nle-tech.com',
      IMAGE_URL: 'https://dev-nl-mes-api.nle-tech.com',
      EUSHOP_ADDRESS: 'http://dev-wxshop.nle-tech.com',
      SHOP_ADMIN: 'https://dev-adminshop.nle-tech.com'
    }
    break
  case 'adminshop.myeushop.com':
    baseApi = {
      // 正式服
      BASE_API_URL: 'https://nl-mes-admin-api.eutechne.com/admin',
      // BASE_API_URL: `https://www.myeushop.com/admin`, // PC端
      IMAGE_URL: 'https://nl-mes-api.eutechne.com',
      EUSHOP_ADDRESS: 'http://wx.myeushop.cn',
      SHOP_ADMIN: 'http://adminshop.myeushop.com'
    }
    break
  // 比利时商城
  case 'adminshop.euonline.nl':
    baseApi = {
      BASE_API_URL: 'https://www.euonline.nl/admin',
      IMAGE_URL: 'https://nl-mes-api.eutechne.com',
      EUSHOP_ADDRESS: 'http://wx.myeushop.cn',
      SHOP_ADMIN: 'http://adminshop.euonline.nl'
    }
    break
  case 'test-adminshop.eutechne.nl':
    baseApi = {
      BASE_API_URL: 'https://test-myeushop.eutechne.com/admin',
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
