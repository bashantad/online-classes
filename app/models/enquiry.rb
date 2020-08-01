class Enquiry < ApplicationRecord
  validates :email, presence: true

  def resolved?
    resolved_at.present?
  end
end
