import { createConnection } from 'mysql';

export const conn = createConnection({
    host: 'myproject.cpylkksl9brd.ap-northeast-2.rds.amazonaws.com',
  	user:'jumpegg',
  	password: 'fly19354',
  	database : 'textShare'
});
