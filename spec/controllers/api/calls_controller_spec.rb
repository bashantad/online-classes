require 'rails_helper'

RSpec.describe Api::CallsController, type: :controller do
  let(:user) { FactoryBot.create(:user, call_limit_per_month: 3) }
  describe "GET #create" do
    before do
      sign_in(user)
    end

    subject do
      get :create
    end

    it "returns success" do
      subject
      call = response.parsed_body
      expect(call['calling_code']).not_to be_nil
      expect(call['user_id']).to eq(user.id)
    end

    it "does not allow to make more calls than the user limit" do
      3.times do
        get :create
        call = response.parsed_body
        expect(call['calling_code']).not_to be_nil
      end
      get :create
      error = response.parsed_body['error']
      expect(error).to eq('You have already reached the call limit. Contact us at support@thevcroom.com to increase the limit.')
    end

    it "does not go into infinite loop when trying to create a call with valid calling code" do
      allow_any_instance_of(Call).to receive(:valid?).and_return(false)
      expect(controller.current_user).to receive(:calls).at_least(35).times.and_call_original
      expect(controller.current_user).to receive(:calls).at_most(40).times.and_call_original
      subject
    end
  end
end
