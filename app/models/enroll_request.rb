class EnrollRequest < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :course
  after_create :send_invitation
  validates :email, presence: true
  validates_uniqueness_of :email, scope: %i[user_id course_id], message: 'Your enrollment request is already sent.'

  def get_full_name
    user&.full_name || full_name
  end

  def approve
    update(approved: true)
  end

  def send_invitation
  	NotificationMailer.with(enroll_request: self).invite_to_course
  end
end
