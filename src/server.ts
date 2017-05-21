import * as http from 'http';
import * as url from 'url';
import * as fs from 'fs';
import * as express from 'express';
import * as session from 'express-session';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as ejs from 'ejs';
import * as path from 'path';
import * as hbs from 'express-handlebars';
import * as passport from 'passport';
import * as LocalStrategy from 'passport-local';

import { userRoute, studyRoute } from './routes';

class Server {
		public test:string;
		public app:express.Application;

		constructor(){
				this.app = express();
				this.init();
				this.middleware();
				this.router();
				this.start();
		}

		private init() {
				this.app.engine('html', hbs({ extname: '.html' }));
				this.app.set('views', path.join(__dirname, '/../views'));
				this.app.set('view engine', 'html');
		}

		private middleware(){
				this.app.use(bodyParser.urlencoded({extended: true}));
				this.app.use(bodyParser.json());
				this.app.use(cookieParser());
				this.app.use(session({
						secret: 'tEsTeD',
						resave: false,
						saveUninitialized: true
				}));
				
				this.app.use('/public', express.static(path.join(__dirname, '/../public')));
				this.app.use('/data', express.static(path.join(__dirname, '/../data')));
				this.app.use('/node_modules', express.static(path.join(__dirname, '/../node_modules')));
				this.app.use('/client', express.static(path.join(__dirname, '/../client')));
		}

		private router(){
				this.app.get('/', function(req, res){
						res.render('index.html');
				});
				this.app.use('/user',userRoute);
				this.app.use('/study',studyRoute);
		}

		private start(){
				this.app.listen(3000, function(){
						console.log('server running');
				});
		}
}

export const server = new Server();


		// form.keepExtensions = true;

		// var dir = './studydata/'+req.session.board_id;
		// var subdir = './studydata/'+req.session.board_id+'/'+y;
		// if(!fs.existsSync(dir)){
		// 	fs.mkdirSync(dir);
		// };
		// if(!fs.existsSync(subdir)){
		// 	fs.mkdirSync(subdir);
		// };

		// form.uploadDir = subdir;

		// form.on('field', function(field, value){
		// 	fields.push([field, value]);
		// })
		// .on('file', function(field, file){
		// 	fs.rename(file.path, form.uploadDir + '/' + file.name);
		// 	mysqlClient.query('update studydata set filename = ? where url = ?',[file.name, y],function(error, result){
		// 		if(error){
		// 			console.log(error);
		// 		}
		// 	});
		// 	files.push([field, file]);
		// })
		// .on('end', function(){
		// 	res.end('success');
		// })
		// .on('error', function(error){
		// 	console.log('[error] error : '+ error);
		// });
		// form.parse(req);