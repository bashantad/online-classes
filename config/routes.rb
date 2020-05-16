Rails.application.routes.draw do
	# Routes for admin pages
	namespace :admin do
		resources :courses, only: [:index] do
			get :approve
			get :disapprove
		end
	end

	# Routes for onboarding Rails pages
  	resources :courses
  	resources :categories
  	devise_for :users

  	# Routes for API
	namespace :api, constraints: { format: 'json' } do
		resources :courses, only: [:index, :show] do
			resources :conversations do
				collection do
					post :create_group
				end
				post :update_members
			end
		end
		resources :conversations, only: [] do
			resources :messages
		end
		resources :users, only: [] do
			collection do
				get :current_user_info
				get '/:conversation_id/mark_messages_read', to: 'users#mark_messages_read'
			end
		end
		resources :calls, only: [:create, :new, :show] do
			get :join
		end
	end
	root :to => 'home#index'
	mount ActionCable.server => '/cable'
	get '/*path' => 'home#index'
end
