Rails.application.routes.draw do
	namespace :api do
		namespace :v1 do
			resources :calls, :only => [:create, :new, :show] do
				get :join
			end
		end
	end
	root 'home#index'
	get '/*path' => 'home#index'
end
