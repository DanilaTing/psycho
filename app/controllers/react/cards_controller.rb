class React::CardsController < ApplicationController
  before_action :set_card, only: [:show, :edit, :update, :destroy]
  skip_before_action :verify_authenticity_token

  # GET /artworks
  # GET /artworks.json
  def index
    @cards = Card.all
  end

  # GET /artworks/1
  # GET /artworks/1.json
  def show
    @cards = Card.all
  end

  # GET /artworks/new
  def new
    @cards = Card.new
  end

  # GET /artworks/1/edit
  def edit
  end

  # POST /artworks
  # POST /artworks.json
  def create
    @card = Card.new(card_params)

    respond_to do |format|
      if @card.save
        format.js {render inline: "location.reload();" }
      else
        format.html { render :new }
        format.json { render json: @card.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /artworks/1
  # PATCH/PUT /artworks/1.json
  def update
    respond_to do |format|
      if @card.update(card_params)
        format.js {render inline: "location.reload();" }
      else
        format.html { render :edit }
        format.json { render json: @card.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /artworks/1
  # DELETE /artworks/1.json
  def destroy
    @card.destroy
    respond_to do |format|
      format.html { redirect_to cards_url, notice: 'Card was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_artwork
      @card = Card.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def artwork_params
      params.require(:card).permit(:name, :id)
    end
end
