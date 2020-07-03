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
    	resources :categories
  	end

	# Routes for on-boarding Rails pages
	namespace :teacher do
  		resources :courses do
  			collection do
  				get :start_journey
  			end
  		end
  	end
  	devise_for :users, :controllers => { :registrations => 'registrations' }
  	resources :users, only: [] do
  		collection do
  			get :edit_password
  			put :update_password
  			get :cancel_account
  			get :details
  			get :upload
  			put :do_upload
  		end
  	end

  	# Routes for API
	namespace :api, constraints: { format: 'json' } do
		resources :courses, only: [:index, :show] do
			resources :conversations do
				collection do
					post :create_group
				end
				post :update_members
			end
			get :conversation_details
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
