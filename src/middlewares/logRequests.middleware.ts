import { NextFunction, Request, Response } from 'express';

const stringifyQueryParams = (queryObject: Object) => {
  const queryParams: string[] = [];

  Object.entries(queryObject).forEach(([name, value]) => {
    queryParams.push(`${name}=${value}`);
  });

  return (!!queryParams.length ? '?' : '') + queryParams.join('&');
};

const stringifyBodyParams = (body: Object) =>
  !!Object.keys(body).length ? `- ${JSON.stringify(body)}` : '';

export default (req: Request, res: Response, next: NextFunction) => {
  const { method, path, query, body } = req;

  const queryParams = stringifyQueryParams(query);
  const bodyParams = stringifyBodyParams(body);
  console.log(`[${method}] - ${path}${queryParams} ${bodyParams}`);

  next();
};
