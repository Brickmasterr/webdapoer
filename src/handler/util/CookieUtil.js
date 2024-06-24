// utils/CookieUtil.js
class CookieUtil {
    static setCookie(res, name, value, options = {}) {
      const cookieOptions = {
        httpOnly: false,
        secure: false,
        sameSite: 'lax',
        ...options
      };

      res.cookie(name, value, cookieOptions);
    //   console.log('set cookie', name, value);
    }

    static getCookie(req, name, path = '/') {
      const cookies = req.cookies || {};

      if (cookies[name]) {
        // console.log('get cookies from req.cookies', cookies[name]);
        return cookies[name];
      }

      const cookieHeader = req.headers.cookie;
      if (cookieHeader) {
        const cookies = cookieHeader.split('; ');

        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].split('=');
          const cookieName = cookie[0];
          const cookieValue = cookie[1];

        //   console.log(cookieName);

          if (cookieName === name && req.path === path) {
            return cookieValue;
          }
        }
      }

      return null;
    }

    static clearCookie(res, name) {
      res.clearCookie(name);
    }
  }

  module.exports = CookieUtil;
