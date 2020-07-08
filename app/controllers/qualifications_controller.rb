class QualificationsController < ApplicationController
  before_action :authentication_user!
  before_action :set_qualification, only: [:show, :edit, :update, :destroy]

  def index
    @educations = current_user.qualifications
    @experiences = current_user.experiences
  end

  def create
    @qualification = current_user.qualifications.new(qualification_params)

    respond_to do |format|
      if @qualification.save
        format.html { redirect_to @qualification, notice: 'Qualification was successfully created.' }
        format.json { render :show, status: :created, location: @qualification }
      else
        format.html { render :new }
        format.json { render json: @qualification.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @qualification.update(qualification_params)
        format.html { redirect_to @qualification, notice: 'Qualification was successfully updated.' }
        format.json { render :show, status: :ok, location: @qualification }
      else
        format.html { render :edit }
        format.json { render json: @qualification.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @qualification.destroy
    respond_to do |format|
      format.html { redirect_to qualifications_url, notice: 'Qualification was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

  def set_qualification
    @qualification = current_user.qualifications.find(params[:id])
  end

  def qualification_params
    params.require(:qualification).permit(:name_of_institution, :string, :year_start, :year_end, :title, :location, :country, :type)
  end
end
