import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function() {
  this.route('login');
  this.route('protected');
  this.route('usuarios');
  this.route('perfiles');
  this.route('contratos');
  this.route('preguntassg');
  this.route('menuprincipal');
  this.route('recuperarcontrasena');
  this.route('clavetemporal');
  this.route('cambiarcontrasena');
  this.route('cambiarcontrasenainterno');
  this.route('imprimir');
  this.route('perfilessucursales');
  this.route('preguntasseguridad');
  this.route('responderpregunta');
});

export default Router;
