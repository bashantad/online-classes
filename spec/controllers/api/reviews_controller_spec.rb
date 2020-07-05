require 'rails_helper'
RSpec.describe Api::ReviewsController, type: :controller do
  let(:course) { FactoryBot.create(:course) }
  let(:user) { FactoryBot.create(:user) }
  let(:review) { FactoryBot.create(:review, :for_course, user_id: user.id, reviewable: course) }

  let(:default_params) do
    { reviewable_type: 'course', reviewable_id: course.id }
  end

  let(:valid_attributes) {
    {rating: 4, comment: 'test string'}
  }

  let(:invalid_attributes) {
    {rating: ''}
  }

  before do
    sign_in(user)
  end

  describe "GET #index" do
    it "returns a success response" do
      review
      get :index, params: default_params
      expect(response).to be_successful
    end
  end

  describe "GET #show" do
    it "returns a success response" do
      get :show, params: {id: review.to_param}.merge(default_params)
      expect(response).to be_successful
    end
  end

  describe "POST #create" do
    context "with valid params" do
      it "creates a new Review" do
        expect {
          post :create, params: {review: valid_attributes}.merge(default_params)
        }.to change(Review, :count).by(1)
      end

      it "redirects to the created api_review" do
        post :create, params: {review: valid_attributes}.merge(default_params)
        expect(response.parsed_body['comment']).to eq(valid_attributes[:comment])
      end
    end

    context "with invalid params" do
      it "returns a success response (i.e. to display the 'new' template)" do
        post :create, params: {review: invalid_attributes}.merge(default_params)
        expect(response).to be_successful
      end
    end
  end

  describe "PUT #update" do
    context "with valid params" do
      let(:new_attributes) {
        { comment: 'hello', rating: 3}
      }

      it "updates the requested review" do
        put :update, params: {id: review.to_param, review: new_attributes}.merge(default_params)
        review.reload
        expect(response.parsed_body['comment']).to eq(new_attributes[:comment])
      end

    end

    context "with invalid params" do
      it "returns a success response (i.e. to display the 'edit' template)" do
        put :update, params: {id: review.to_param, review: invalid_attributes}.merge(default_params)
        expect(response).to be_successful
      end
    end
  end

  describe "DELETE #destroy" do
    it "destroys the requested review" do
      expect {
        delete :destroy, params: {id: review.to_param}.merge(default_params)
      }.to change(Review, :count).by(-1)
    end

    it "is successful" do
      delete :destroy, params: {id: review.to_param}.merge(default_params)
      expect(response).to be_successful
    end
  end

end
