class Qualification < ApplicationRecord
	belongs_to :user
	validates :name_of_institution, :type, :title, :location, :country, presence: true
	validates :year_start, numericality: true
	validates :year_end, numericality: true, allow_blank: true
end
