const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(createProxyMiddleware('/login', {
    target: 'http://localhost:8080',
    secure: false,
    changeOrigin: true,
 
  }),createProxyMiddleware('/isLogin', {
    target: 'http://localhost:8080',
    secure: false,
    changeOrigin: true,
 
  })
  ,createProxyMiddleware('/push', {
    target: 'http://localhost:8080',
    secure: false,
    changeOrigin: true,
 
  }),
  createProxyMiddleware('/Online', {
    target: 'http://localhost:8080',
    secure: false,
    changeOrigin: true,
 
  }),
  )
}
1
