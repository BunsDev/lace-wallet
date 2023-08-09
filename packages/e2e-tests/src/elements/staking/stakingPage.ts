/* eslint-disable no-undef */
import SectionTitle from '../sectionTitle';

class StakingPage {
  private SEARCH_ICON = '[data-testid="search-icon"]';
  private SEARCH_INPUT = '.ant-select-selection-search input';
  private SEARCH_INPUT_PLACEHOLDER_IN_POPUP = '.ant-select-selection-placeholder';
  private STAKE_POOL_LIST_HEADER_TEMPLATE = '[data-testid="stake-pool-list-header-###COLUMN_NAME###"]';
  private EMPTY_SEARCH_RESULTS_IMAGE = '[data-testid="stake-pool-table-empty-image"]';
  private EMPTY_SEARCH_RESULTS_MESSAGE = '[data-testid="stake-pool-table-empty-message"]';
  private SEARCH_LOADER = '[data-testid="search-loader"]';
  private OVERVIEW_TAB = '[data-testid="overview-tab"]';
  private BROWSE_POOLS_TAB = '[data-testid="browse-tab"]';
  private GOT_IT_BUTTON = '[data-testid="multidelegation-beta-modal-button"]';

  get title() {
    return SectionTitle.sectionTitle;
  }

  get counter() {
    return SectionTitle.sectionCounter;
  }

  get stakingPageSearchIcon() {
    return $(this.SEARCH_ICON);
  }

  get stakingPageSearchInput() {
    return $(this.SEARCH_INPUT);
  }

  get searchInputPlaceholderInPopup() {
    return $(this.SEARCH_INPUT_PLACEHOLDER_IN_POPUP);
  }

  get emptySearchResultsImage() {
    return $(this.EMPTY_SEARCH_RESULTS_IMAGE);
  }

  get emptySearchResultsMessage() {
    return $(this.EMPTY_SEARCH_RESULTS_MESSAGE);
  }

  get searchLoader() {
    return $(this.SEARCH_LOADER);
  }
  get browsePoolTab() {
    return $(this.BROWSE_POOLS_TAB);
  }

  get gotItButton() {
    return $(this.GOT_IT_BUTTON);
  }

  async clickBrowsePoolsTab() {
    await this.browsePoolTab.waitForClickable();
    await this.browsePoolTab.click();
  }

  async clickGotItButton() {
    await this.gotItButton.waitForClickable({ timeout: 5000 });
    await this.gotItButton.click();
  }

  stakingPoolListColumnHeader(listHeader: string) {
    const headerColumnSelector = this.STAKE_POOL_LIST_HEADER_TEMPLATE.replace(
      '###COLUMN_NAME###',
      listHeader === 'ros' ? 'apy' : listHeader
    );
    return $(headerColumnSelector);
  }

  stakingPoolWithName(poolName: string) {
    return $(`h6=${poolName}`);
  }
}

export default new StakingPage();
