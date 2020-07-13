require 'rails_helper'

RSpec.describe "Teaching::CourseContents", type: :request do
  describe "GET /teaching/course_contents" do
    it "works! (now write some real specs)" do
      get teaching_course_contents_path
      expect(response).to have_http_status(200)
    end
  end
end
