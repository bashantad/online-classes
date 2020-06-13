class Call < ApplicationRecord
  RETRY_CODE_GENERATION_LIMIT = 20
  belongs_to :user
  scope :created_between, -> (start_date, end_date) { where("created_at >= ? AND created_at <= ?", start_date, end_date )}
  validates_uniqueness_of :call_code, scope: %i[user_id]

end
