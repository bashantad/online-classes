class User < ApplicationRecord
  	# Include default devise modules. Others available are:
  	# :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  	devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :trackable, :confirmable
    has_many :conversation_users
	has_many :conversations, through: :conversation_users
	has_many :messages, foreign_key: :sender_id
	has_many :courses
end
