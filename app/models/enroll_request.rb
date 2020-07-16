class EnrollRequest < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :course
  after_create :send_invitation
  validates :email, presence: true

  def send_invitation
  	NotificationMailer.with(enroll_request: self).invite_to_course
  end
end
