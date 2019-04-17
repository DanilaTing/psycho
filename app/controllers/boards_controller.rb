class BoardsController < ApplicationController
  before_action :authenticate_user!
  # load_and_authorize_resource
  before_action :set_general_board, :set_boards, only: [:index, :show]
  before_action :set_board, only: [:show, :edit, :update, :destroy]

  def index
    @board_json = current_user.boards.where(general: true).as_json(
      include: {
        columns: {
          include: {
            tasks: {
              only: [:id, :name, :description, :project_id, :type]
            }
          }
        }
      }
    )

    @board = current_user.boards.find_by_name('General')
  end

  def show
    @board_json = Board.find(params[:id]).as_json(
      include: {
        columns: {
          include: {
            tasks: {
              only: [:id, :name, :description, :project_id, :type]
            }
          }
        }
      }
    )

    @board = current_user.boards.find(params[:id])
  end

  # GET /boards/new
  def new
    @board = Board.new
  end

  # GET /boards/1/edit
  def edit
  end

  # POST /boards
  # POST /boards.json
  def create
    @board = Board.new(board_params)
    @board.user_id = current_user.id

    respond_to do |format|
      if @board.save
        format.html { redirect_to @board, notice: 'Board was successfully created.' }
        format.json { render :show, status: :created, location: @board }
      else
        format.html { render :new }
        format.json { render json: @board.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /boards/1
  # PATCH/PUT /boards/1.json
  def update
    respond_to do |format|
      if @board.update(board_params)
        format.html { redirect_to @board, notice: 'Board was successfully updated.' }
        format.json { render :show, status: :ok, location: @board }
      else
        format.html { render :edit }
        format.json { render json: @board.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /boards/1
  # DELETE /boards/1.json
  def destroy
    @board.destroy
    respond_to do |format|
      format.html { redirect_to boards_url, notice: 'Board was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_board
      @board = Board.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def board_params
      params.require(:board).permit(:name, :project_id, :position)
    end
end
