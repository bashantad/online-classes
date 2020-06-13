class User < ApplicationRecord
  	# Include default devise modules. Others available are:
  	# :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
    devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :trackable, :confirmable
    has_many :conversation_enrolled_users
    has_many :conversations, through: :conversation_enrolled_users
    has_many :enrolled_course_users
    has_many :enrolled_courses, through: :enrolled_course_users, source: :course
    has_many :messages, foreign_key: :sender_id
    has_many :user_message_notifications
    has_many :notification_messages, through: :user_message_notifications, source: :message
    has_many :courses
    has_many :enroll_requests
    has_many :calls

    validates :full_name, presence: true

    def is_within_call_limit?
        self.calls.created_between(1.months.ago, Time.now).count < self.call_limit_per_month
    end
end
