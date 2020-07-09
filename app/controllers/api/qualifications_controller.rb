class Api::QualificationsController < Api::BaseController
  before_action :authenticate_user!
  before_action :set_qualification, only: [:show, :edit, :update, :destroy]

  def index
    render json: {
      education: current_user.educations,
      experiences: current_user.experiences,
    }
  end

  def create
    @qualification = current_user.qualifications.new(qualification_params)
    if @qualification.save
      flash[:notice]  = 'Qualification was successfully created.'
      render json: @qualification
    else
      render json: {errors: @review.errors}, status: :unprocessable_entity
    end
  end

  def update
    if @qualification.update(qualification_params)
      flash[:notice]  = 'Qualification was successfully updated.'
      render json: @qualification
    else
      render json: {errors: @review.errors}, status: :unprocessable_entity
    end
  end

  def destroy
    @qualification.destroy
    render json: {}
  end

  private

  def set_qualification
    @qualification = current_user.qualifications.find(params[:id])
  end

  def qualification_params
    params.require(:qualification).permit(:name_of_institution, :string, :year_start, :year_end, :title, :location, :country, :type)
  end
end
