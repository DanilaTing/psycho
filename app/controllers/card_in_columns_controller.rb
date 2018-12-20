class CardInColumnsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_card_in_column, only: [:show, :edit, :update, :destroy]

  # GET /card_in_columns
  # GET /card_in_columns.json
  def index
    @card_in_columns = CardInColumn.all
  end

  # GET /boards/1
  # GET /boards/1.json
  def show
  end

  # GET /boards/new
  def new
    @card_in_column = CardInColumn.new
  end

  # GET /boards/1/edit
  def edit
    @columns = Column.all
    @column = Column.find(params[:column_id])
  end

  def new_card_in_column
    @card_in_column = CardInColumn.new

    respond_to do |format|
      format.js { render :newCardInColumn }
    end
  end

  # POST /boards
  # POST /boards.json
  def create
    @card_in_column = CardInColumn.new(card_in_column_params)

    respond_to do |format|
      if @card_in_column.save
        format.html { redirect_to @card_in_column, notice: 'Video was successfully created.' }
        format.json { render :show, status: :created, location: @card_in_column }
        format.js { render :newCardInColumn }
      else
        format.html { render :new }
        format.json { render json: @card_in_column.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /card_in_columns/1
  # PATCH/PUT /card_in_columns/1.json
  def update
    respond_to do |format|
      if @card_in_column.update(card_in_column_params)

      else

      end
    end
  end

  # DELETE /boards/1
  # DELETE /boards/1.json
  def destroy
    @card_in_column.destroy
    respond_to do |format|
      format.html { redirect_to card_in_columns_url, notice: 'Board was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_card_in_column
      @card_in_column = CardInColumn.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def card_in_column_params
      params.require(:card_in_column).permit(:column_id, :card_id)
    end

end
