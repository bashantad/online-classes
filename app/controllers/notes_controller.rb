class NotesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_notebook
  before_action :set_all_notes
  before_action :set_note, only: [:show, :edit, :update, :destroy]

  def index
    if @notes.count > 0
      redirect_to edit_notebook_note_path(@notebook, @notes.first)
    else
      redirect_to new_notebook_note_path(@notebook)
    end
  end

  def new
    @note = @notebook.notes.new
  end

  def edit
  end

  def create
    @note = @notebook.notes.new(note_params.merge(user_id: current_user.id))
    if @note.save
      redirect_to edit_notebook_note_path(@notebook, @note), notice: 'Note was successfully created.'
    else
      render :new
    end
  end

  def update
    if @note.update(note_params)
      redirect_to edit_notebook_note_path(@notebook, @note), notice: 'Note was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    @note.destroy
    redirect_to notebook_notes_path(@notebook), notice: 'Note was successfully deleted.'
  end

  private
  def set_note
    @note = @notebook.notes.find(params[:id])
  end

  def set_notebook
    @notebook = current_user.notebooks.find(params[:notebook_id])
  end

  def set_all_notes
    @notes = @notebook.notes.order("created_at DESC")
  end

  def note_params
    params.require(:note).permit(:title, :description)
  end
end
