class CardsController < ApplicationController
  before_action :set_card, only: [:show, :edit, :update, :destroy, :turn_into_project]

  # GET /cards
  # GET /cards.json
  def index
    @cards = Card.all
    @columns = Column.all
  end

  # GET /cards/1
  # GET /cards/1.json
  def show
    @columns = Column.all
  end

  # GET /cards/new
  def new
    @card = Card.new
  end

  # GET /cards/1/edit
  def edit
    @columns = Column.all
  end

  def turn_into_project
    # self.params[:type] = 'Project'
    # self.update(card_params)
    @card.type = "Project"

    respond_to do |format|
      if @card.save
        set_card
        format.html { redirect_to @card, notice: 'Card was turned into the project.' }
        # format.html { redirect_to card_path(@card), notice: 'Card was turned into the project.' }
        format.json { render :show, status: :created, location: @card }
      else
        format.html { render :new }
        format.json { render json: @card.errors, status: :unprocessable_entity }
      end
    end
  end

  # POST /cards
  # POST /cards.json
  def create
    @card = Card.new(card_params)

    respond_to do |format|
      if @card.save
        format.html { redirect_to @card, notice: 'Card was successfully created.' }
        format.json { render :show, status: :created, location: @card }
      else
        format.html { render :new }
        format.json { render json: @card.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /cards/1
  # PATCH/PUT /cards/1.json
  def update
    respond_to do |format|
      if @card.update(card_params)
        format.html { redirect_to @card, notice: 'Card was successfully updated.' }
        format.json { render :show, status: :ok, location: @card }
      else
        format.html { render :edit }
        format.json { render json: @card.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /cards/1
  # DELETE /cards/1.json
  def destroy
    @card.destroy
    respond_to do |format|
      format.html { redirect_to cards_url, notice: 'Card was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_card
      @card = Card.find(params[:id])
    end

    def set_card_in_column
      @card_in_column = CardInColumn.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def card_params
      params.require(:card).permit(:type, :name, :description, card_in_columns_attributes: [:id, :column_id, :card_id])
    end
end
