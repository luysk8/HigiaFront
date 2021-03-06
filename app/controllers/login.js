import EmberController from '@ember/controller';
import { inject } from '@ember/service';
import ENV from '../config/environment';
import $ from 'jquery';
export default EmberController.extend({
	session: inject('session'),
	init:function() {
		this._super(...arguments);
		if(this.get('session.isAuthenticated')){
			window.location.href='/protected';
		}
	},
	labels:LANG[ENV.APP_LANG],
	actions: {
		authenticate(){
			let {username,password} = this.getProperties('username','password');
			let identification =username;
			let  u = this.get('session').authenticate('authenticator:oauth2',identification,password).then(() =>{
				let{access_token,cookie_higia} = this.get('session.data.authenticated');
				console.log('FOO ',cookie_higia);
				if (cookie_higia.cmbo_cntrsna){
					window.location.href='/cambiarcontrasenainterno';
				}else{
					window.location.href='/protected';
				}
			}).catch((reason)=>{
				console.log(reason);
				if(typeof reason.error == "object"){
					if(reason.error.password){
						$("#danger").html("Debes digitar la contraseña").fadeTo(ENV.TIME_OUT_ALERT, ENV.TIME_IN_ALERT).slideUp(ENV.TIME_IN_ALERT, function(){
								$("#danger").slideUp(ENV.TIME_IN_ALERT);
						});
					}
					if(reason.error.username){
						$("#danger").html("Debes digitar el usuario ").fadeTo(ENV.TIME_OUT_ALERT, ENV.TIME_IN_ALERT).slideUp(ENV.TIME_IN_ALERT, function(){
								$("#danger").slideUp(ENV.TIME_IN_ALERT);
						});
					}
					console.log(typeof reason.rerror);
				} else if(reason.error){
					$("#danger").html(reason.error).fadeTo(ENV.TIME_OUT_ALERT, ENV.TIME_IN_ALERT).slideUp(ENV.TIME_IN_ALERT, function(){
							$("#danger").slideUp(ENV.TIME_IN_ALERT);
					});
				}
			});

		},
		obtenerImage(){
			let {username} = this.getProperties('username');
			if(username != ''){
				var o = this;
				$.post( ENV.SERVER_API+"/api/auth/imagen_usuario", { "username": username}).done(function( data ) {
					if(data.fto_usro != null){
						$('#user_photo').attr('src',data.fto_usro);
						o.set('errorMessage',data.error);
					}else{
						$('#user_photo').attr('src', '/assets/img/login_user_image.png');
						o.set('errorMessage',data.error);
					}
				}).fail(function(data){
					$('#user_photo').attr('src', '/assets/img/login_user_image.png');
					o.set('errorMessage',data.responseJSON.error);
				});
			}else{
				$('#user_photo').attr('src', '/assets/img/login_user_image.png');
			}
			//verificar si la imagen es cargada de forma correcta sino se mantiene la imagen default
			var imgUser = $('#user_photo')[0];
			imgUser.onerror = function(){
				$('#user_photo').attr('src', '/assets/img/login_user_image.png');
			}
		}
	}
});
