﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace GreatWarriorDataAccess
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class GreatWarriorEntities : DbContext
    {
        public GreatWarriorEntities()
            : base("name=GreatWarriorEntities")
        {
            Configuration.ProxyCreationEnabled = false;
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Admin> Admins { get; set; }
        public virtual DbSet<FigureItem> FigureItems { get; set; }
        public virtual DbSet<FigureItemsByPlayer> FigureItemsByPlayers { get; set; }
        public virtual DbSet<Figure> Figures { get; set; }
        public virtual DbSet<FiguresInGame> FiguresInGames { get; set; }
        public virtual DbSet<FiguresOfPlayer> FiguresOfPlayers { get; set; }
        public virtual DbSet<GamesHistory> GamesHistories { get; set; }
        public virtual DbSet<PlayerGift> PlayerGifts { get; set; }
        public virtual DbSet<Player> Players { get; set; }
    }
}
