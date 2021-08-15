Rails.application.routes.draw do
  get 'quizzes/index'
  # Routes for admin pages
	namespace :admin do
		resources :courses, only: [:index, :show] do
			get :approve
			get :disapprove
    end
    resources :categories
  end

	# Routes for on-boarding Rails pages
	namespace :teaching do
  		resources :courses do
  			collection do
  				get :start_teaching
        end
				resources :enrollments, only: [] do
					collection do
						get :bulk_enrollment
						post :enroll_users
						get :requests
					end
					get :accept
					get :decline
				end
				resources :chapters, except: [:index] do
					resources :course_contents, except: [:index]
					resources :assignments do
						get :answers
					end
        end
      end
			resources :quizzes
  end

  match "zohoverify/verifyforzoho", to: 'home_page#verify', :via => [:get]

  devise_for :users, controllers: {
  		registrations: 'registrations',
  		sessions: 'sessions',
  		passwords: 'passwords',
  		confirmations: 'confirmations'
  }
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
	resources :notebooks, except: [:show] do
		resources :notes, except: [:show]
	end

  # Routes for API
	namespace :api, constraints: { format: 'json' } do
		resources :courses, only: [:index, :show] do
			resources :conversations do
				collection do
					post :create_group
				end
				get :messages
				post :update_members
			end
			get :conversation_details
			post :enrollment_request
			collection do
				get :enrolled
      end
      resources :chapters, only: [] do
				resources :assignment_submissions, only: [:update] do
					get :find_or_create, on: :collection
				end
      end
    end
		resources :qualifications, only: [:index, :create, :update, :destroy]
		resources :reviews
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
    resources :enquiries, only: [:create]
	end
	root :to => 'home_page#index'
	mount ActionCable.server => '/cable'
	get '/*path', to: 'home_page#index', constraints: lambda { |req|
		req.path.exclude? 'rails/active_storage'
	}
end
