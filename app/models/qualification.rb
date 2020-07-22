class Qualification < ApplicationRecord
	belongs_to :user
	validates :name_of_institution, :type, :year_start, :title, :location, :country, presence: true
end
