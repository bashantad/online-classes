FactoryBot.define do
	factory :review do
		comment { "MyText" }
	    rating { 1 }
	    user_id { FactoryBot.create(:user).id }
	    trait :for_course do
	    	association :reviewable, factory: :course
	    end
	end
end
