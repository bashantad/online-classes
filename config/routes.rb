Rails.application.routes.draw do
	# Routes for admin pages
	namespace :admin do
		resources :courses, only: [:index, :show] do
			get :approve
			get :disapprove
			get :enrollment
			post :enroll_users
			get :enrollment_requests
    end
  end

	# Routes for on-boarding Rails pages
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
		resources :calls, only: [:create] do
      match '/:user_id/join/:calling_code', to: 'calls#join', on: :collection, :via => [:get, :post]
		end
		resources :users, only: [] do
			collection do
				get :current_user_info
				get '/:conversation_id/mark_messages_read', to: 'users#mark_messages_read'
			end
		end
	end
	root :to => 'home#index'
	mount ActionCable.server => '/cable'
	get '/*path' => 'home#index'
end
