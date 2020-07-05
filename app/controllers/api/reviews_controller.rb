class Api::ReviewsController < Api::BaseController
  before_action :set_model
  before_action :set_review, only: [:show, :update, :destroy]

  def index
    @reviews = @model.reviews
    render json: @reviews
  end

  def show
    @review = @model.reviews.find(params[:id])
    render json: @review
  end

  def create
    @review = @model.reviews.new(review_params.merge(user_id: current_user.id))

    if @review.save
      flash[:notice] = 'Review was successfully created.'
      render json: @review
    else
      render json: {errors: @review.errors}, status: :unprocessable_entity
    end
  end

  def update
    if @review.update(review_params)
      flash[:notice] = 'Review was successfully updated.'
      render json: @review
    else
      render json: {errors: @review.errors}, status: :unprocessable_entity
    end
  end

  def destroy
    @review.destroy
    render json: {}
  end

  private

  def set_review
    @review = @model.reviews.find_by(user_id: current_user.id, id: params[:id])
  end

  def review_params
    params.require(:review).permit(:comment, :rating)
  end

  def set_model
    klass = params[:reviewable_type].capitalize.constantize
    @model = klass.find(params[:reviewable_id])
  end
end
