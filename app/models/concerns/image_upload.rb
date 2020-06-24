require 'active_support/concern'

module ImageUpload
	extend ActiveSupport::Concern

	included do

		def acceptable_image
			return unless avatar_image.attached?

			unless avatar_image.byte_size <= 1.megabyte
				errors.add(:avatar_image, "is too big")
			end

			acceptable_image_types = ["image/jpeg", "image/png", "images/jpg"]
			unless acceptable_image_types.include?(avatar_image.content_type)
				errors.add(:avatar_image, "must be a JPEG or PNG or JPG")
			end
		end
	end
end
