import React, { useState, useCallback, useMemo } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { PortfolioHeader } from './components/PortfolioHeader';
import { BalanceCard } from './components/BalanceCard';
import { ActionButtons } from './components/ActionButtons';
import { AssetCard } from './components/AssetCard';
import { ActivityList } from './components/ActivityList';
import { CategoryCard } from './components/CategoryCard';
import { PortfolioData, Asset, Transaction, Category } from './types';
import { PORTFOLIO_DATA, CHART_LABELS, CHART_DATA } from './data';

export const DashboardScreen: React.FC = () => {
  const [activePeriod, setActivePeriod] = useState<'1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL'>('1D');
  const [showAllAssets, setShowAllAssets] = useState(false);

  const chartPoints = useMemo(() => CHART_DATA[activePeriod], [activePeriod]);
  const displayedAssets = showAllAssets ? PORTFOLIO_DATA.assets : PORTFOLIO_DATA.assets.slice(0, 4);

  const handleActionPress = useCallback((action: { id: string; label: string }) => {
    console.log(`Action pressed: ${action.label}`);
  }, []);

  const handleAssetPress = useCallback((asset: Asset) => {
    console.log(`Asset pressed: ${asset.symbol}`);
  }, []);

  const handleTransactionPress = useCallback((transaction: Transaction) => {
    console.log(`Transaction pressed: ${transaction.id}`);
  }, []);

  const handleCategoryPress = useCallback((category: Category) => {
    console.log(`Category pressed: ${category.name}`);
  }, []);

  const handleLoadMoreAssets = useCallback(() => {
    setShowAllAssets(true);
  }, []);

  const handleLoadMoreActivity = useCallback(() => {
    console.log('Load more activity');
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <PortfolioHeader userName="Alex Morgan" onProfilePress={() => console.log('Profile pressed')} />

        <BalanceCard
          totalValue={PORTFOLIO_DATA.totalValue}
          changeValue={PORTFOLIO_DATA.changeValue24h}
          changePercent={PORTFOLIO_DATA.changePercent24h}
          chartPoints={chartPoints}
          activePeriod={activePeriod}
          onPeriodChange={setActivePeriod}
        />

        <ActionButtons onActionPress={handleActionPress} />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Assets</Text>
          <TouchableOpacity style={styles.viewAllButton} onPress={handleLoadMoreAssets} activeOpacity={0.7}>
            <Text style={styles.viewAllText}>
              {showAllAssets ? 'Show Less' : 'View All'}
            </Text>
          </TouchableOpacity>
        </View>

        {displayedAssets.map((asset) => (
          <AssetCard key={asset.id} asset={asset} onPress={() => handleAssetPress(asset)} showChevron />
        ))}

        {!showAllAssets && PORTFOLIO_DATA.assets.length > 4 && (
          <TouchableOpacity style={styles.loadMoreCard} onPress={handleLoadMoreAssets} activeOpacity={0.7}>
            <Text style={styles.loadMoreText}>+{PORTFOLIO_DATA.assets.length - 4} more assets</Text>
          </TouchableOpacity>
        )}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          contentContainerStyle={styles.categoryScrollContent}
        >
          {PORTFOLIO_DATA.categories.map((category) => (
            <CategoryCard key={category.id} category={category} onPress={() => handleCategoryPress(category)} />
          ))}
        </ScrollView>

        <ActivityList
          transactions={PORTFOLIO_DATA.transactions}
          onLoadMore={handleLoadMoreActivity}
          onTransactionPress={handleTransactionPress}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0A0A0F',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 28,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  viewAllButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  viewAllText: {
    fontSize: 13,
    color: '#4F46E5',
    fontWeight: '600',
  },
  loadMoreCard: {
    backgroundColor: '#1A1A2E',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 24,
    marginTop: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2D2D44',
    borderStyle: 'dashed',
  },
  loadMoreText: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  categoryScrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
});