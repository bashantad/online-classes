Rails.application.routes.draw do
	namespace :api, constraints: { format: 'json' } do
		resources :calls, :only => [:create, :new, :show] do
			get :join
		end
	end
	root 'home#index'
	get '/*path' => 'home#index'
end
