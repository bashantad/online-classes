Rails.application.routes.draw do
	namespace :admin do
		resources :courses, :only => [:index] do
			get :approve
			get :disapprove
		end
	end
  	resources :courses
  	resources :categories
  	devise_for :users
	namespace :api, constraints: { format: 'json' } do
		resources :conversations
		resources :messages
		resources :calls, :only => [:create, :new, :show] do
			get :join
		end
	end
	root :to => 'home#index'
	mount ActionCable.server => '/cable'
	get '/*path' => 'home#index'
end
