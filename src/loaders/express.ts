import express from 'express';
import bodyParser from 'body-parser';
import routes from '../api';
import config from '../config';
export default ({ app }: { app: express.Application }) => {
  /**
   * Health Check endpoints
   * ELB에서 정상인 endpoints를 계속해서 체크해주기 위함
   */
  app.get('/health', (req, res) => {
    res.status(200).end();
  });
  app.head('/health', (req, res) => {
    res.status(200).end();
  });

  // 역방향 프록시 (Heroku, Bluemix, AWS ELB, Nginx 등) 뒤에있는 경우 유용합니다.
  // heroku 또는 Cloudwatch 로그에 실제 원본 IP를 표시합니다.
  app.enable('trust proxy');

  // 클라이언트가 지원하지 않는 곳에서 PUT 또는 DELETE와 같은 HTTP 동사를 사용할 수 있습니다.
  app.use(require('method-override')());

  // req.body의 원시 문자열을 json으로 변환하는 미들웨어
  app.use(bodyParser.json());
  // Load API routes
  app.use(config.api.prefix, routes());

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });

  /// error handlers
  app.use((err, req, res, next) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === 'UnauthorizedError') {
      return res
        .status(err.status)
        .send({ message: err.message })
        .end();
    }
    return next(err);
  });
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};
